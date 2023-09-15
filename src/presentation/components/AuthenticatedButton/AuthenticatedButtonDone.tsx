import {
  Avatar,
  Text
} from "@mantine/core";
import { CSSProperties } from "react";
import { IconLogout } from "@tabler/icons-react";

export type AuthenticatedButtonDoneProps = {
  imageURL: string;
  name: string;
};

export const AuthenticatedButtonDone = (props: AuthenticatedButtonDoneProps) => {
  const {
    imageURL,
    name
  } = props;

  const getShorterName = (name: string): string => {
    const spaceCharacter = String.fromCharCode(32);

    let lastNamePartIndex = 1;

    const filterFirstTwoNameParts = (namePart: string, index: number): boolean => {
      const shouldKeepNamePart = index <= lastNamePartIndex;

      const maximumNamePartLengthToIncreaseLastIndex = 4;
      if (namePart.length <= maximumNamePartLengthToIncreaseLastIndex)
        lastNamePartIndex++;

      return shouldKeepNamePart;
    };

    const shorterName = name
      .split(spaceCharacter)
      .filter(filterFirstTwoNameParts)
      .join(spaceCharacter);

    return shorterName;
  };

  const divStyle: CSSProperties = {
    flex: 1
  };

  return (
    <>
      <Avatar
        src={imageURL}
        radius="xl"
      />

      <div style={divStyle}>
        <Text
          size="sm"
          weight={500}
        >
          { getShorterName(name) }
        </Text>

        <Text size="xs">
        Click to logout
        </Text>
      </div>

      <IconLogout
        size="1.25rem"
        stroke={1.5}
      />
    </>
  );
};
