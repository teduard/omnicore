import { VectorIndex } from "./vectorIndex";
import { BM25 } from "./bm25";
import { embed } from "./embedding";
import { fuse } from "./hybridRanker";

class SearchEngine {
    private vectorIndex: VectorIndex;
    private bm25: BM25;

  constructor(
    vectorIndex: VectorIndex,
    bm25: BM25
  ) {
    this.vectorIndex = vectorIndex;
    this.bm25 = bm25;

  }

  async search(query: string) {
    console.log("query = ", query);

    const queryVec = await embed(query);

    const semantic = this.vectorIndex.search(query, queryVec, 20);
    const keyword = this.bm25.search(query);

    console.log("semantic: ", semantic);
    console.log("keyword: ", keyword);

    return fuse(semantic, keyword).slice(0, 10);   

    return semantic.slice(0,5);
  }
}

const vector = new VectorIndex();
const bm25 = new BM25();

const data = [
    "Kaufland, morcovi, fulgi forza, morcovi, fulgi forza, morcovi, fulgi forza, morcovi, fulgi forza, morcovi, fulgi forza",
    "Lidl, dulce",
    "Lidl, prosoape bucatarie",
    "Lidl, parmezan, cartofi",
    "Carrefour, castraveti",
    "Carrefour, rucola, varza",
    "Abonament Netflix", "Abonament youtube premium", "AWS", "Spray ulei coco", "Lidl, mici, lapte, varza", "Bilete teatru vivi", "Frizerie", "Lidl, saci gunoi", "Lidl, mancare pisici", "Lidl, oua, salata verde, ceapa", "Decathlon, adidasi asics", "Carrefour, cartofi", "Carrefour, alune", "Lidl, inghetata, curmale", "Lidl, sushi", "Lidl, iaurt grecesc", "Piata obor, curmale", "Medicamente coco", "Indulcitor stevia", "Cartela metrou", "Flori biserica", "Covrigi", "Concert delia", "Obor chilipir, covoras", "Obor Chilipir, mancare pisici", "Piata obor, broccoli", "Kaufland, kinder bueno", "Kaufland, morcovi, fulgi forza", "Lidl, dulce", "Lidl, prosoape bucatarie", "Lidl, parmezan, cartofi", "Carrefour, pufuleti", "Carrefour, castraveti", "Carrefour, pufuleti", "Carrefour, varza, rucola", "Cartela metrou", "Leroy merlin, robinet ag", "Leroy merlin, peleti pisici", "Auchan, pufuleti", "Kaufland, fulgi, proschiuto, mandarine", "Lidl, unt ag", "Benzina masina", "Mega image, dulce", "Flori", "Spalat masina", "Lidl, iaurt, masline, branza topita", "Carrefour, siracha", "Carrefour, pufuleti,halva"
  ];

  const start = Date.now();

  for(let i=50000; i<data.length;i++) {
    const e = await embed(data[i]);

    bm25.add(
        data[i],
        data[i]
    )

    vector.add({
      id: data[i],
      text: data[i],
      vector: e
    })
  }

  const end = Date.now();
  const elapsed = end - start;
  console.log("elapsed time:", elapsed/1000);


const engine = new SearchEngine(vector, bm25);


console.log("vector:", vector);
console.log("bm25:", bm25);

export {SearchEngine, engine}