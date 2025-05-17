"use client";

import React, { useEffect } from "react";

// Set Tag - Only for Meta Tags
const setMeta = (property, value, content) => {
    if (property === "charset") {
        const pastMeta = document.querySelector(`meta[charset]`);
        if (pastMeta) {
            pastMeta.setAttribute("charset", value);
        } else {
            const metaElement = document.createElement("meta");
            metaElement.setAttribute("charset", value);
            document.head.appendChild(metaElement);
        }
        return;
    }

    const pastMeta = document.querySelector(`meta[${property}="${value}"]`);
    if (pastMeta) {
        pastMeta.setAttribute("content", content);
    } else {
        const metaElement = document.createElement("meta");
        metaElement.setAttribute(property, value);
        metaElement.setAttribute("content", content);
        document.head.appendChild(metaElement);
    }
};

// Set Element - Other common Tags
const setElement = (element, props) => {
    const newElement = document.createElement(element);
    Object.entries(props)
        .filter(([key]) => key !== "children")
        .forEach(([key, value]) => {
            newElement.setAttribute(key, value);
        });
    if (props.children) {
        newElement.textContent = props.children;
    }
    document.head.appendChild(newElement);
};

// Hook to use React Head
export const useReactHead = ({
    title,
    base,
    meta,
    link,
    style,
    script,
    noscript,
    template,
}) => {
    useEffect(() => {
        if (!title) return;

        document.title = title;
    }, [title]);

    useEffect(() => {
        if (!base) return;

        const pastBase = document.querySelector("base");
        if (pastBase) {
            Object.entries(base).forEach(([key, value]) => {
                pastBase.setAttribute(key, value);
            });
        } else {
            const baseElement = document.createElement("base");
            Object.entries(base).forEach(([key, value]) => {
                baseElement.setAttribute(key, value);
            });
            document.head.appendChild(baseElement);
        }
    }, [base]);

    useEffect(() => {
        if (meta.length === 0) return;

        meta.forEach((item) => {
            const { name, property, httpEquiv, charset, content } = item;
            if (charset) {
                setMeta("charset", charset);
                return;
            }
            const tag = name
                ? "name"
                : property
                ? "property"
                : httpEquiv
                ? "http-equiv"
                : null;

            const value = name || property || httpEquiv;
            if (!tag) return;
            setMeta(tag, value, content);
        });
    }, [meta]);

    useEffect(() => {
        if (link.length === 0) return;

        link.forEach((item) => setElement("link", item));
    }, [link]);

    useEffect(() => {
        if (style.length === 0) return;

        style.forEach((item) => setElement("style", item));
    }, [style]);

    useEffect(() => {
        if (script.length === 0) return;

        script.forEach((item) => setElement("script", item));
    }, [script]);

    useEffect(() => {
        if (noscript.length === 0) return;

        noscript.forEach((item) => setElement("noscript", item));
    }, [noscript]);

    useEffect(() => {
        if (template.length === 0) return;

        template.forEach((item) => setElement("template", item));
    }, [template]);
};

// Component to use React Head (Recommended)
const ReactHead = ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    const title = childrenArray.find(
        (child) => React.isValidElement(child) && child.type === "title"
    );

    const base = childrenArray.find(
        (child) => React.isValidElement(child) && child.type === "base"
    );

    const meta = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "meta"
    );

    const link = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "link"
    );

    const style = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "style"
    );

    const script = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "script"
    );

    const noscript = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "noscript"
    );

    const template = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === "template"
    );

    useReactHead({
        title: title ? String(title.props.children) : undefined,
        base: base ? base.props : undefined,
        meta: meta.map((elm) => (React.isValidElement(elm) ? elm.props : {})),
        link: link.map((elm) => (React.isValidElement(elm) ? elm.props : {})),
        style: style.map((elm) => (React.isValidElement(elm) ? elm.props : {})),
        script: script.map((elm) =>
            React.isValidElement(elm) ? elm.props : {}
        ),
        noscript: noscript.map((elm) =>
            React.isValidElement(elm) ? elm.props : {}
        ),
        template: template.map((elm) =>
            React.isValidElement(elm) ? elm.props : {}
        ),
    });

    return null;
};

export default ReactHead;
