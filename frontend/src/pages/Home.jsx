import { useSelector } from "react-redux";

function Home() {
  const {user} = useSelector((state)=>state.auth)
  return (
    <>
      <h1>Hello {user.firstName}, Welcome to codeSmith</h1>
    </>
  );
}

export default Home;
