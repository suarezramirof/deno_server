import express, {Request, Response} from "npm:express@4.18.2";
import React from "https://esm.sh/react@17.0.2";
import { renderToString } from "https://esm.sh/react-dom@17.0.2/server";

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const ColorForm = () => {
  return (
    <div>
      <form action="/" method="post">
        <input
          type="text"
          placeholder="Enter a color"
          name="col"
          id="col"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

const ColorList = ({ colors }: { colors: string[] }) => (
  <ul>
    {colors.map((color, index) => (
      <li key={index} style={{ color }}>
        {color}
      </li>
    ))}
  </ul>
);

const colors: string[] = [];

app.get("/", (req: Request , res: Response) => {
  const appString = renderToString(
    <>
      <ColorForm />
      <ColorList colors={colors} />
    </>,
  );

  res.send(`
    <html>
      <head>
        <style>body { background-color: black; }</style>
      </head>
      <body>
        <div id="root">${appString}</div>
      </body>
    </html>
  `);
});

app.post("/", (req: Request, res: Response) => {
  const color = req.body.col;
  console.log(color);
  colors.push(color || "");
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
