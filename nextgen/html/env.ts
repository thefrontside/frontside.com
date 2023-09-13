export const PAGE_SENSE_SCRIPT_SRC = getEnv("PAGE_SENSE_SCRIPT_SRC");

interface Env {
  PAGE_SENSE_SCRIPT_SRC: string;
}

function getEnv(name: keyof Env): string | undefined {
  return Deno.env.get(name);
}
