import {
  FastifyPluginOptions,
  FastifyPluginCallback,
  FastifyPluginAsync,
} from "fastify";
import { finderRecipeSchema } from "./fluentSchema";
import {
  ResCategories,
  PanelType,
  Trait,
  ReqSearchQuery,
  ResSearchResult,
  ActiveTrait,
} from "../../shared/sharedInterfaces";
import TftSearch, { getActiveTrait } from "./tftSearch";
import { CombStrategy } from "./tftSearch/strategies/combination";

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", async (request, reply) => {
    return reply.send({ hello: "wolrd!!!" });
  });

  fastify.get("/users", async (request, reply) => {
    const users = await fastify.prisma.user.findMany();

    return reply.send(users);
  });

  fastify.get<{
    Querystring: IQueryStringfinderRecipe;
  }>(
    "/api/finder-recipe",
    { schema: finderRecipeSchema },
    async (request, reply) => {
      // const {level } = request.query.
    }
  );

  fastify.get("/api/champions", async (request, reply) => {
    const champions = await fastify.prisma.champion.findMany();

    return reply.send(champions);
  });

  fastify.get("/api/tftfinder/categories", async (request, reply) => {
    const champions = await fastify.prisma.champion.findMany();
    const traits =
      (await fastify.prisma.trait.findMany()) as unknown as Trait[];

    const res: ResCategories = {
      Champions: { panelType: PanelType.CHAMPION_PANEL, data: champions },
      Traits: { panelType: PanelType.TRAIT_PANEL, data: traits },
      "Search Results": { panelType: PanelType.RESULT_PANEL, data: [] },
    };
    return reply.send(res);
  });

  fastify.get("/api/tftfinder/search", async (request, reply) => {
    const { capacity, championIds, traitOpts } =
      request.query as ReqSearchQuery;

    const combSearch = new TftSearch(new CombStrategy());
    const getChampionsList = await combSearch.get({
      capacity,
      championIds,
      traitOpts,
    });

    const activeTraits = getChampionsList.map((champions) =>
      getActiveTrait(champions)
    );

    const res = [] as ResSearchResult[];
    for (let i = 0; i < getChampionsList.length; i++) {
      res.push({
        placedChampions: getChampionsList[i],
        activeTraits: activeTraits[i],
      });
    }

    return reply.send(res);
  });
};

interface IQueryStringfinderRecipe {
  level: string;
  expecting_traits: { trait_id: string; set: number }[];
  current_champions: string[];
  sort: any;
}
export default routes;
