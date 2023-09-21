import {
  createStyles,
  rem,
  Button
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles(
  theme => (
    {
      control: {
        height: rem(54),
        paddingLeft: rem(38),
        paddingRight: rem(38),

        [theme.fn.smallerThan("sm")]: {
          height: rem(54),
          paddingLeft: rem(18),
          paddingRight: rem(18),
          flex: 1
        }
      }
    }
  )
);

export const AuthenticateButton = () => {
  const { classes } = useStyles();

  const buttonGradient = {
    from: "blue",
    to: "cyan"
  };

  return (
    <>
      <Link to="/auth">
        <Button
          size="xl"
          variant="gradient"
          gradient={buttonGradient}
          className={classes.control}
        >
          Authenticate
        </Button>
      </Link>
    </>
  );
};
