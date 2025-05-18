import React from "react";

export interface UseReactHeadProps {
    title?: string;
    base?: Record<string, any>;
    meta?: Record<string, any>[];
    link?: Record<string, any>[];
    style?: Record<string, any>[];
    script?: Record<string, any>[];
    noscript?: Record<string, any>[];
    template?: Record<string, any>[];
}

export declare const useReactHead: (props: UseReactHeadProps) => void;

export declare const ReactHead: React.FC<{ children: React.ReactElement }>;
