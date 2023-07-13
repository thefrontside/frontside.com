import type { Operation } from "effection";

export default function* IndexHTML(): Operation<JSX.Element> {
  return (
    <section>
      <p>
        Our Advanced Plugin Development workshop is more than just a
        training program - it's a transformative experience designed
        to provide you with the skills, knowledge, and confidence to
        fully harness the power of Backstage. Be it integrating new
        functionalities or optimizing existing processes, this
        workshop will prepare you to tackle real-world challenges with
        ease.
      </p>
    </section>
  );
}
