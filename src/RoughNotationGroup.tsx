import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { annotationGroup } from "rough-notation";

const Context = createContext(null);

const initialState = {
  annotations: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD": {
      const annotations = [...state.annotations, payload];

      return { ...state, annotations };
    }
    default:
      return state;
  }
}

export function RoughNotationGroup({ children, show }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const group = annotationGroup(
      state.annotations.map(({ current }) => current)
    );

    if (show) {
      group.show();
    } else {
      group.hide();
    }
  }, [state, show]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export function useGroupContext(annotation) {
  const context = useContext(Context);
  const initialProps = useRef({ annotation, context });

  useEffect(() => {
    const { annotation, context } = initialProps.current;

    if (!context) {
      return undefined;
    }

    const { dispatch } = context;

    dispatch({
      type: "ADD",
      payload: annotation,
    });
  }, []);
}
