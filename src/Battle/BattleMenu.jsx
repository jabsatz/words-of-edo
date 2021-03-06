import { useCallback } from "react";
import { useState } from "react";
import SpellBook from "../Common/SpellBook";
import TextCrawl from "../Common/TextCrawl";
import { toPercentage } from "../helpers";
import { useGlobalKeypress } from "../hooks";
import "./BattleMenu.scss";

export default function BattleMenu({ state, monk, mission }) {
  const [spellBookOpen, setSpellBookOpen] = useState(false);

  useGlobalKeypress(
    useCallback(
      (e) => {
        if (e.code === "Digit1" || e.code === "Escape") {
          setSpellBookOpen(!spellBookOpen);
        }
      },
      [spellBookOpen]
    )
  );

  let missionObj = "";
  if (mission.type === "protect")
    missionObj = mission.type
      ? `${mission.displayObjective}: ${toPercentage(
          state.objectiveHP,
          mission.objectiveHP
        )}`
      : "";
  return (
    <>
      <SpellBook
        spells={monk.spells}
        show={spellBookOpen}
        onClose={() => setSpellBookOpen(false)}
      />
      <div className="bottom-menu">
        <div
          className="bottom-menu__square bottom-menu__spell"
          onClick={() => setSpellBookOpen(true)}
        >
          <div className="bottom-menu__button">Open spellbook ( 1 )</div>
        </div>
        <div className="bottom-menu__square bottom-menu__hp">
          <div className="bottom-menu__text">
            HP: {Math.max(state.hp, 0)}/{monk.hp}
          </div>
        </div>
        <div className="bottom-menu__square bottom-menu__objective-data">
          <div className="bottom-menu__text">
            Enemy HP: {Math.max(state.monsterHp, 0)}
          </div>
        </div>
        <div className="bottom-menu__square bottom-menu__objective">
          <div className="bottom-menu__text">{missionObj}</div>
        </div>
        <ul className="bottom-menu__log">
          {state.log.map((line) => (
            <li className="bottom-menu__log__line" key={line.pos}>
              <TextCrawl disableSkip>{line.text}</TextCrawl>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
