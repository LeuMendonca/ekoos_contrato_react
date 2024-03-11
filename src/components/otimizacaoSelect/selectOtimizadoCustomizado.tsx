import Select, { IndicatorSeparatorProps, createFilter } from "react-select";
import { MenuList } from "./otimizacaoSelect";
import { ConsoleConstructorOptions } from "console";
import { ChangeEvent } from "react";

interface SelectOtimizadoCustomizadoProps {
  options: any;
  field: any;
  heigth?: number;
  width?: string;
  placeholder: string;
}

interface SelectItemOtimizadoCustomizadoProps {
  options: any;
  heigth?: number;
  width?: string;
  placeholder: string;
  onChange: any;
  value: any;
}

const indicatorSeparatorStyle = {};

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<ConsoleConstructorOptions, true>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

export function SelectOtimizadoCustomizado({
  options,
  field,
  heigth,
  width,
  placeholder,
  
}: SelectOtimizadoCustomizadoProps) {
  return (
    <Select
      options={options}
      components={{ MenuList: MenuList , IndicatorSeparator: null}}
      placeholder={placeholder}
      value={options.find((c: any) => c.value === field.value)}
      onChange={(val) => field.onChange(val?.value)}
      filterOption={createFilter({ ignoreAccents: false })}
      maxMenuHeight={heigth}
      menuPlacement="bottom"
      classNamePrefix="react-select"

      styles={{
        control: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          height: "2.5rem",
          width: `${width}`,

          borderRadius: "calc(var(--radius) - 2px)",
          border: "1px solid #E5E7EB",

          backgroundColor: "#fff",

          padding: "0.25rem 0.1rem",

          fontSize: "0.875rem",

          boxShadow: "0 0 0 1px #F9FAFB",
        }),
        placeholder: (base) => ({
          ...base,
          color: "hsl(var(--muted-foreground))",
        }),
        option: (styles) => ({
          ...styles,
          fontSize: "0.8rem",
          paddingLeft: "1rem",
          cursor: "pointer",
          padding: "0.5rem",
        }),
        menu: (styles) => ({
          ...styles,
          borderRadius: "5px",
          borderColor: "#E5E7EB",
          marginTop: ".5rem",
          transition: "2s",
          width: `${width}`
        }),
      }}
    />
  );
}

export function SelectItemOtimizadoCustomizado({ options , placeholder , heigth , width , value , onChange }:SelectItemOtimizadoCustomizadoProps){
  return (
    <Select
      options={options}
      components={{ MenuList: MenuList , IndicatorSeparator: null}}
      placeholder={placeholder}
      value={ options.find((c: any) => c.value === value ) }
      onChange={ ( optionSelected ) => onChange(optionSelected?.value)}
      filterOption={createFilter({ ignoreAccents: false })}
      maxMenuHeight={heigth}
      menuPlacement="bottom"
      classNamePrefix="react-select"

      styles={{
        control: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          height: "2.5rem",
          width: `${width}`,

          borderRadius: "calc(var(--radius) - 2px)",
          border: "1px solid #E5E7EB",

          backgroundColor: "#fff",

          padding: "0.25rem 0.1rem",

          fontSize: "0.875rem",

          boxShadow: "0 0 0 1px #F9FAFB",
        }),
        placeholder: (base) => ({
          ...base,
          color: "hsl(var(--muted-foreground))",
        }),
        option: (styles) => ({
          ...styles,
          fontSize: "0.8rem",
          paddingLeft: "1rem",
          cursor: "pointer",
          padding: "0.5rem",
        }),
        menu: (styles) => ({
          ...styles,
          borderRadius: "5px",
          borderColor: "#E5E7EB",
          marginTop: ".5rem",
          transition: "2s",
          width: `${width}`
        }),
      }}
    />
  );
}