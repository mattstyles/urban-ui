import type { FlexProps } from "@urban-ui/flex";
import React, {
	useMemo,
	useState,
	useCallback,
	useEffect,
	useRef,
	Children,
	cloneElement,
	isValidElement,
	createRef,
} from "react";

type Orientation = Pick<FlexProps, "orientation">["orientation"];
type ElementRefs = Array<React.RefObject<HTMLElement> | null>;
type SelectionActions = {
	next: () => void;
	prev: () => void;
};

type MappedActions = Map<string, keyof SelectionActions>;
function getActionMapper(orientation: Orientation): MappedActions {
	const map: MappedActions = new Map();
	if (orientation === "v") {
		map.set("ArrowUp", "prev");
		map.set("ArrowDown", "next");
		return map;
	}
	// Horizontal by default
	map.set("ArrowLeft", "prev");
	map.set("ArrowRight", "next");
	return map;
}

export function useKeys(orientation: Orientation, actions: SelectionActions) {
	const map = getActionMapper(orientation);
	return useCallback(
		(event: KeyboardEvent) => {
			const mappedAction = map.get(event.key);
			if (mappedAction == null || actions[mappedAction] == null) {
				return;
			}

			// preventDefault is called to stop window scrolling on arrow key press
			event.preventDefault();
			actions[mappedAction]();
		},
		[actions, map],
	);
}

export type GroupChildrenProps = {
	children: React.ReactNode;
	onKeyDown: (event: KeyboardEvent) => void;
	isTabbable?: boolean;
	currentIndex: number;
	setIndex: (index: number) => void;
};
export function useGroupChildren({
	children,
	onKeyDown,
	isTabbable = false,
	currentIndex,
	setIndex,
}: GroupChildrenProps) {
	const createFocusHandler = useCallback(
		(index: number) => {
			return () => setIndex(index);
		},
		[setIndex],
	);
	return useMemo(() => {
		if (typeof children === "function") {
			return children;
		}

		const refs: ElementRefs = [];

		const groupChildren = Children.map(children, (child, idx) => {
			if (!isValidElement(child)) {
				refs.push(null);
				return child;
			}

			const tabIndex = isTabbable ? 0 : idx === currentIndex ? 0 : -1;
			const ref = createRef<HTMLElement>();
			refs.push(ref);
			return cloneElement(child, {
				ref: ref,
				onKeyDown: onKeyDown,
				onFocus: createFocusHandler(idx),
				tabIndex: tabIndex,
				...child.props,
			});
		});

		return {
			groupChildren,
			refs,
		};
	}, [children, onKeyDown, isTabbable, currentIndex, createFocusHandler]);
}

export function useSelectIndex({
	children,
	isWrap = false,
}: {
	children: React.ReactNode;
	isWrap?: boolean;
}) {
	const length = useMemo(() => Children.toArray(children).length, [children]);
	const [currentIndex, setCurrentIndex] = useState(0);
	return useMemo(() => {
		if (length <= 1) {
			return {
				currentIndex: currentIndex,
				next: () => {},
				prev: () => {},
				set: () => {},
			};
		}

		return {
			currentIndex: currentIndex,
			next: () => {
				if (isWrap) {
					setCurrentIndex((currentIndex + 1) % length);
					return;
				}

				setCurrentIndex(Math.min(currentIndex + 1, length - 1));
			},
			prev: () => {
				if (isWrap) {
					if (currentIndex === 0) {
						setCurrentIndex(length - 1);
						return;
					}

					setCurrentIndex((currentIndex - 1) % length);
					return;
				}

				setCurrentIndex(Math.max(currentIndex - 1, 0));
			},
			// @TODO no clamp checks or wrap checks here, we currently just trust the consumer
			set: (idx: number) => {
				setCurrentIndex(idx);
			},
		};
	}, [length, currentIndex, isWrap]);
}

// export function useWrappedIndex({children}: {children: React.ReactNode}) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   return useMemo(() => {
//     if (children == null) {
//       return {
//         currentIndex: currentIndex,
//         next: () => {},
//         prev: () => {},
//         set: () => {},
//       }
//     }

//     const length = Children.toArray(children).length

//     return {
//       currentIndex: currentIndex,
//       next: () => {
//         setCurrentIndex((currentIndex + 1) % length)
//       },
//       prev: () => {
//         if (currentIndex === 0) {
//           setCurrentIndex(length - 1)
//           return
//         }
//         setCurrentIndex((currentIndex - 1) % length)
//       },
//       set: (index: number) => {
//         setCurrentIndex(index % length)
//       },
//     }
//   }, [children, currentIndex])
// }

type FocusEffectProps = {
	currentIndex: number;
	refs: ElementRefs;
	autoFocus?: boolean;
};
export function useFocusEffect({
	currentIndex,
	refs,
	autoFocus = false,
}: FocusEffectProps) {
	const prev = useRef<number | null>(null);
	useEffect(() => {
		if (currentIndex === prev.current) {
			return;
		}

		const ref = refs[currentIndex];
		if (ref == null || ref.current == null) {
			prev.current = null;
			return;
		}

		if (prev.current == null && autoFocus === false) {
			prev.current = currentIndex;
			return;
		}

		prev.current = currentIndex;
		ref.current.focus();
	}, [currentIndex, refs, autoFocus]);
}
