import React, { createContext, useEffect, useRef } from "react";

const BreadcrumbDataContext = createContext([]);

export const BreadcrumbDataProvider = () => {
    const [breadcrumbData, setBreadcrumbData] = useState([]);

    return (
        <BreadcrumbDataContext.Provider
            value={[breadcrumbData, setBreadcrumbData]}
        />
    );
};

export const useBreadcrumb = ({ url, label }) => {
    const thisCrumb = useRef({ url, label });
    const [breadcrumbData, setBreadcrumbData] = useContext(
        BreadcrumbDataContext
    );
    useEffect(() => {
        if (
            !breadcrumbData.some((crumb) => crumb.url === thisCrumb.current.url)
        ) {
            setBreadcrumbData((prevBreadcrumbData) => [
                ...prevBreadcrumbData,
                thisCrumb.current
            ]);
        } else {
            setBreadcrumbData((prevBreadcrumbData) =>
                prevBreadcrumbData.map((crumb) =>
                    crumb === thisCrumb ? thisCrumb.current : crumb
                )
            );
        }
        return () => {
            setBreadcrumbData((prevBreadcrumbData) =>
                prevBreadcrumbData.filter((crumb) => crumb !== thisCrumb)
            );
        };
    }, [thisCrumb, breadcrumbData, setBreadcrumbData, url, label]);
};

export const Breadcrumbs = () => {
    const [breadcrumbData] = useContext(BreadcrumbDataContext);
    return (
        <nav className="breadcrumbs">
            <ol>
                {breadcrumbData
                    .flatMap((breadcrumb) => [
                        <li key={breadcrumb.href}>
                            <a href={breadcrumb.href}>{breadcrumb.label}</a>
                        </li>,
                        <li key="separator">/</li>
                    ])
                    .slice(0, -1)}
            </ol>
        </nav>
    );
};
