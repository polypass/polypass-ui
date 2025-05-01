import plugin from "tailwindcss/plugin.js";

export const polypassui = (): ReturnType<typeof plugin> => {
  return plugin(() => {}, {
    theme: {
      extend: {
        fontFamily: {
          sans: ["Mlvuka"],
        },
        colors: {
          "poly-blue": "#3C82F6",
          "poly-green": "#49DE80",
        },
      },
    },
  });
};
