const { append } = require('funcadelic');
const _slugify = require('slugify');

const slugify = str => _slugify(str, {
  lower: true
});

const bySlugPredicate = regEx => node => node.fields.slug && regEx.test(node.fields.slug)

exports.sourceNodes = function sourceNodes({ actions: { createNodeField }, getNodes }) {

  let markdownFiles = getNodes().filter(node => node.internal.type === 'MarkdownRemark')

  let people = markdownFiles
    .filter(bySlugPredicate(/^\/people/))
    .map(node => append(node, {
      get slug() {
        return slugify(node.frontmatter.name)
      }
    }));

  let peopleBySlug = people.reduce((people, person) => ({
    ...people,
    [person.slug]: person
  }), {});

  let posts = markdownFiles
    .filter(bySlugPredicate(/^\/blog/))
    .map(node => append(node, {
      get authors() {
        let post = this;
        return node.frontmatter.author.split(', ')
          .map(slugify)
          .map(slug => {
            let person = peopleBySlug[slug];
            if (person) {
              return person;
            } else {
              console.log(`Could not find person:${slug} to relate post: ${post.frontmatter.title}`);
            }
          }).filter(Boolean);
      }
    }));

  let episodes = getNodes()
    .filter(node => node.internal.type === 'SimplecastEpisode')
    .map(node => append(node, {
      get authors() {
        let episode = this;
        return node.author.split(', ')
          .map(slugify)
          .map(slug => {
            let person = peopleBySlug[slug];
            if (person) {
              return person;
            } else {
              console.log(`Could not find person:${slug} to relate to episode: ${episode.title}`);
            }
          }).filter(Boolean);
      }
    }));

  people
    .map(person => append(person, {
      get posts() {
        return posts.filter(post => post.authors.includes(person))
      },
      get episodes() {
        return episodes.filter(episode => episode.authors.includes(person));
      }
    }))
    .forEach(node => {
      createNodeField({
        node,
        name: 'posts',
        value: node.posts.map(post => post.id)
      })
      createNodeField({
        node,
        name: 'episodes',
        value: node.episodes.map(episode => episode.id)
      })
    });

  [...posts, ...episodes].forEach(node => {
    createNodeField({
      node,
      name: 'authors',
      value: node.authors.map(author => author.id)
    });
  });
};