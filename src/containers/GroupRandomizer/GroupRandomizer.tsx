import { Button, Label, NumberInput } from "components";

import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import useGroupRandomizer from "./hooks/useGroupRandomizer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  padding: 0px 24px;
  background-color: grey;
  height: 100%;
`;

const GroupRandomizer = () => {
  const { t } = useTranslation();
  const {
    addPlayersToList,
    generateGroups,
    playerList,
    playersGeneratedGroup,
    playerInput,
    playerNumberPerGroup,
    setPlayerInput,
    setPlayerNumberPerGroup,
  } = useGroupRandomizer();
  const [numberOfGroups, setNumberOfGroups] = useState(0);

  return (
    <Container>
      <h1>{t("GroupRandomizer.title")}</h1>
      <div>
        <Label> Player Tag</Label>
        <TextField
          onChange={(event) => setPlayerInput(event.target.value)}
          multiline
          value={playerInput}
        />
        <Button onClick={addPlayersToList}>Add</Button>
      </div>
      <NumberInput
        label={"Number of groups"}
        max={playerList.length}
        number={numberOfGroups}
        setNumber={setNumberOfGroups}
      />
      {playerList.length > 0 && (
        <ul>
          {playerList.map((player) => (
            <li>{player}</li>
          ))}
          <div>{t("GroupRandomizer.parametersTitle")}</div>
          <TextField
            onChange={(event) =>
              setPlayerNumberPerGroup(Number.parseInt(event.target.value))
            }
            label={t("GroupRandomizer.parametersPlayerNumber")}
            value={playerNumberPerGroup}
          />
          <Button onClick={generateGroups}>Generate</Button>
        </ul>
      )}
      {playersGeneratedGroup.length > 0 &&
        playersGeneratedGroup.map((group, index) => {
          return (
            <>
              <div>Group {index + 1}</div>
              <ul>
                {group.map((player) => (
                  <li>{player}</li>
                ))}
              </ul>
            </>
          );
        })}
    </Container>
  );
};

export default GroupRandomizer;
