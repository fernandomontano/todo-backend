import app from "./app";
import router from "./routes/router";

app.use("/api", router);

const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
