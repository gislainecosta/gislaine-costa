import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUserState } from "../../redux/store/users/types";
import { RootState } from "../../redux/store";
import MonitoringPoints from "../../layout/monitoringPoints";
import Machines from "../../layout/Machines";
import NavBar from "../../layout/Navbar";
import Header from "../../layout/Header";
import * as St from "./styles";

export default function Home() {
  const [tab, setTab] = useState<string>("machines");
  const isMobile = window.screen.width < 1024;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(!isMobile);
  const navigate = useNavigate();
  const user: IUserState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    !user.isLogged && navigate("/");
  }, [navigate, user]);

  return (
    <St.HomeContainer>
      {isMobile && <Header openNavbar={setIsMenuOpen} />}
      {isMenuOpen && (
        <NavBar
          isMobile={isMobile}
          setTab={setTab}
          open={isMenuOpen}
          setOpen={setIsMenuOpen}
        />
      )}
      {tab === "machines" ? (
        <Machines isMobile={isMobile} />
      ) : (
        <MonitoringPoints isMobile={isMobile} />
      )}
    </St.HomeContainer>
  );
}
