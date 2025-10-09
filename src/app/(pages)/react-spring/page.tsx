import GridExample from "./grid-exmaple";
import ImaginationText from "./ImaginationText";
// import MacDashboardExample from "./MacDashboardExample";
import Multistage from "./multistage";
import UseChainExample from "./UseChainExample";
import UseTransition from "./UseTransition";

export default function ReactSpringPage() {
  return (
    <div className="max-width mx-auto mt-20">
      {/* <MacDashboardExample /> */}
      <ImaginationText />
      <UseChainExample />
      <Multistage />
      <UseTransition />
      <GridExample />
    </div>
  );
}
