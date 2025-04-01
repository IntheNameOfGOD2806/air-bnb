import { useEffect, useState } from "react";
const useCheckHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    return { hasMounted };
};
export { useCheckHasMounted }