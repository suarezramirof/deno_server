import React, { ChangeEvent } from "https://esm.sh/react@17.0.2";
import ReactDOMServer from "https://esm.sh/react-dom@17.0.2/server";

import {
  Application,
  opine,
  Request,
  Response,
  targetValue
} from "https://deno.land/x/opine@2.3.4/mod.ts";

const app: Application = opine();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(
  3000,
  () => console.log("server has started on http://localhost:3000 🚀"),
);

const html = `
<html>
  <head>
    <style>body {background-color: black;}</style>
  </head>
  <body>
    <div id="root">${appString}</div>
  </body>
</html>
`;

const ColorForm = () => {
  const [color, setColor] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
    setColor("");
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(targetValue(e));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={color} onChange={handleOnChange} />
      </form>
    </div>
  );
};
