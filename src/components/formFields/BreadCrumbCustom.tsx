import { Breadcrumb } from "rsuite";

interface BreadCrumbProps {}

const BreadCrumbCustom = ({ ...props }: BreadCrumbProps) => {
  const locationIsName = location.pathname.split("/").slice(1);
  const isLocation = location.pathname.split("/").filter((part) => part !== "");
  const isRenderComponente = () => {
    const resultLocations = isLocation.reduce<string[]>((acc, part, index) => {
      const previousPath = index > 0 ? acc[index - 1] : "";
      const newPath = `${previousPath}/${part}`;
      return [...acc, newPath];
    }, []);
    const outputBreadCrumb = [];
    for (let i in resultLocations) {
      outputBreadCrumb.push(
        <Breadcrumb.Item
          href={resultLocations[i]}
          key={i}
          active={resultLocations.length - 1 == parseInt(i) ? true : false}
        >
          {locationIsName[i]}
        </Breadcrumb.Item>
      );
    }
    return outputBreadCrumb;
  };
  return (
    <>
      <Breadcrumb style={{ marginTop: "16px" }}>
        {isRenderComponente()}
      </Breadcrumb>
    </>
  );
};

export { BreadCrumbCustom };
