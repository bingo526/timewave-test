import Header from "components/Header";
import Chart from "components/Chart";
import bgImage from "assets/bg-image.jpg";
import useTokenPair from "hooks/useTokenPair";
import { CircleLoader } from "react-spinners";

function App() {
  const { isLoading } = useTokenPair();
  return (
    <div>
      <div className="fixed -z-10 h-screen w-screen">
        <div className="bg-gradient-dark absolute z-10 h-full w-full"></div>
        <img
          alt="background"
          decoding="async"
          data-nimg="fill"
          className="animate-fade object-cover absolute h-full w-full"
          sizes="100vw"
          src={bgImage}
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center gap-8 items-center h-screen">
          <CircleLoader
            color="#36d7b7"
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-8 items-center h-screen">
          <Header />
          <Chart />
        </div>
      )}
    </div>
  );
}

export default App;
