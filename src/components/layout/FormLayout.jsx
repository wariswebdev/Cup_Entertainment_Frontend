import React from "react";

const FormLayout = ({ title, subtitle, children, actions, breadcrumb }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          {breadcrumb && (
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              {breadcrumb.map((item, index) => (
                <span key={index} className="flex items-center">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#af3494] hover:text-[#9c2d84]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-500">{item.label}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <span className="mx-2">›</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
        {actions && <div className="flex space-x-3">{actions}</div>}
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default FormLayout;
