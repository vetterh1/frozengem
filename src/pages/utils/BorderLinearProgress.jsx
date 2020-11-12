// MUI
import LinearProgress from "@material-ui/core/LinearProgress";
// HOC
import { withStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    backgroundColor: theme.palette.primary.light,
  },
  bar: {
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
  },
}))(LinearProgress);

export default BorderLinearProgress;