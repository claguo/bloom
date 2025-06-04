import React, { useState } from "react";

function NavBar() {
  const [active, setActive] = useState(null);
  // const location = useLocation();

  // useEffect(() => {
  //   setActive(location.pathname);
  // }, [location]);

  return <div className="text-[24px] font-mono text-text-default">BLOOMS</div>;
}

export default NavBar;
