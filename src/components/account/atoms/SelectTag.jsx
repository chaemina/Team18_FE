import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CATEGORY } from "../constants/TAGLIST";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9BC60",
    },
  },
});

export default function SelectTag({ selected, onSelectedChange, ...props }) {
  const handleOnChange = (event, newValue) => {
    if (newValue.length <= 3 && newValue.length >= 1) {
      const selectedCategories = newValue.map((item) => item.category);
      onSelectedChange(selectedCategories);
    }
  };

  return (
    <div className="justify-center items-center">
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          required
          name={props.name}
          fullWidth={true}
          includeInputInList={true}
          id={props.id}
          options={CATEGORY}
          value={selected.map((category) =>
            CATEGORY.find((item) => item.category === category)
          )}
          getOptionLabel={(option) => option.category}
          onChange={handleOnChange}
          color="main"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Interests"
              placeholder="Choose your favorites!"
            />
          )}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </ThemeProvider>
    </div>
  );
}
