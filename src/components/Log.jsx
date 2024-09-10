function Log(props) {
  return (
    <>
      <ol>
        {props.data?.map((l) => (
          <li key={l.at} style={{ textAlign: "left" }}>
            {l.text}
          </li>
        ))}
      </ol>
    </>
  );
}

export default Log;
