import background from "../../assets/images/background.jpg";

export default function BackgroundImage(props: any) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          height: "1111px",
          width: "1986px",
          margin: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
