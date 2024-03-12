import React, { useRef, setState } from "react";
import { isThrowStatement } from "typescript";

/**
 * This is a hook that returns a proxied ref and a setter for the ref.
 * Since the ref is proxied, it can be used in a component's state
 * and will cause the component to re-render when the ref is mutated.
 * if the state is mutated by the setter.
 */
export const useMutatableState = (initialValue) => {
    const ref = useRef(initialValue);
    const [proxy, setProxy] = setState(new Proxy(ref.current));
    return [
        proxy,
        (mutator) => {
            if (!(mutator instanceof Function)) {
                throw new Error("Mutatable state setter must be a function");
            }
            const current = ref.current;
            const mutated = mutator(current);
            if (mutated !== current) {
                throw new Error(
                    "Mutatable state setter must return the mutated state"
                );
            }
            setProxy(new Proxy(current, {}));
        }
    ];
};
