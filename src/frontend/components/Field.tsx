import React, { ReactNode } from "react";

interface Props {}
const rowCnt = 4;
const colCnt = 7;
const fr = [0];
const fc = [0];
for (let i = 1; i < rowCnt; i++) {
  fr.push(i);
}
for (let i = 1; i < colCnt; i++) {
  fc.push(i);
}

const Field: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-fit  mx-auto">
      {fr.map((v1, i) => {
        return (
          <div key={"fr" + i} className="lg:even:ml-12 md:even:ml-10">
            {fc.map((v2, j) => {
              return (
                <div
                  key={"fc" + j}
                  className="inline-block hexagon w-24 h-24 bg-slate-900 mx-2"
                >
                  <div className="hexagon w-24 h-24 scale-90 from-slate-500 text-center hover:from-slate-300 bg-gradient-to-r">
                    {i + " " + j}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Field;
