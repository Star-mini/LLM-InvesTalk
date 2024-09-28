import { useCallback, useState } from "react";
import Input from "@mui/joy/Input";
import { IconButton } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./NavBar.module.css";

import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const { keyword, setKeyword } = props;

  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();

  const onChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const onSearch = useCallback(() => {
    setKeyword(searchText);
    setSearchText("");
    navigate(`/detail`);
  }, [searchText, setKeyword, navigate]);

  return (
    <div className={styles["frame-8"]}>
      <img
        className={styles["frame-9"]}
        src="https://c.animaapp.com/8Gc7c0uK/img/frame-130.svg"
        alt="Frame"
      />
      <Input
        className={styles["vector-wrapper"]}
        placeholder="Search..."
        value={searchText}
        onChange={onChange}
        sx={{
          borderRadius: "40px",
        }}
        startDecorator={
          <IconButton
            variant="plain"
            size="sm"
            onClick={onSearch}
            className={styles["custom-icon-button"]}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                "--Icon-color": "currentColor",
                color: "var(--joy-palette-neutral-plainHoverColor, #0b0d0e)",
              },
              "&:active": {
                backgroundColor: "transparent",
                "--Icon-color": "currentColor",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        }
      />

      {searchText && (
        <div className={styles["rectangle-10"]}>
          <div className={styles["text-wrapper-25"]}>Search Result 1</div>
          <div className={styles["text-wrapper-26"]}>Search Result 2</div>
          <div className={styles["text-wrapper-27"]}>Search Result 3</div>
        </div>
      )}

      <div className={styles["navbar"]}>
        <div className={styles["text-wrapper-9"]}>Menu</div>
        <div className={styles["text-wrapper-10"]}>News</div>
        <div className={styles["text-wrapper-9"]}>Trend</div>
        <div className={styles["text-wrapper-9"]}>Mypage</div>
      </div>
    </div>
  );
};

export default NavBar;
