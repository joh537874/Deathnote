export default function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[2px] bg-white mx-[2px] align-middle"
      style={{
        height: "0.9em",
        animation: "blink 1s step-end infinite",
        verticalAlign: "middle",
      }}
    />
  );
}
