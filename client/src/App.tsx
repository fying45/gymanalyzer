import { GymWorkout } from "./components/GymWorkout/GymWorkout";
import { Header } from "./pages/Header";
import { PageLayout } from "./pages/PageLayout";

export const App = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <GymWorkout />
      </PageLayout>
    </>
  );
};
