import { useEffect } from "react";
import { PanelType, TabCategory } from "../../shared/sharedInterfaces";
import ChampionTile from "./ChampionTile";
import SearchResult from "./SearchResult";
import TraitSelect from "./TraitSelect";

interface Props {
  category: TabCategory<any>;
}

const PanelContent: React.FC<Props> = (props: Props) => {
  const { category } = props;

  useEffect(() => {}, [category]);

  switch (category.panelType) {
    case PanelType.CHAMPION_PANEL:
      return <ChampionTile champions={category.data} precondChampions={[]} />;
    case PanelType.TRAIT_PANEL:
      return <TraitSelect />;
    case PanelType.RESULT_PANEL:
      return <SearchResult />;
    default:
      return <div></div>;
  }
};

export default PanelContent;
