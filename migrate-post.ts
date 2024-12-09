let [postfilename] = Deno.args;

let postdirname = `${postfilename}`.slice(0, -3);

Deno.mkdirSync(postdirname, { recursive: true });
