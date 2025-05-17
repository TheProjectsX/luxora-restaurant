import React from "react";

export interface UseNextHeadProps {
    title?: string;
    base?: Record<string, any>;
    meta?: Record<string, any>[];
    link?: Record<string, any>[];
    style?: Record<string, any>[];
    script?: Record<string, any>[];
    noscript?: Record<string, any>[];
    template?: Record<string, any>[];
}

export declare const useNextHead: (props: UseNextHeadProps) => void;

export declare const NextHead: React.FC<{ children: React.ReactElement }>;
