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
  onChange?: any;
  value: any;
  idItem?: number;
  inputName?: string;
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
          borderWidth: "1px",
          backgroundColor: 'hsl(var(--background-color))',
          padding: "0.25rem 0.1rem",
          fontSize: "0.875rem",
        }),
        singleValue: ( value) => ({
          ...value,
          color: 'hsl(var(-muted-foreground))',

        }),
        placeholder: ( styles ) => ({
          ...styles,
          color: 'hsl(var(-muted-foreground)'
        }),
        input: ( value ) => ({
          ...value,
            color: 'white'
        }),
        option: (styles , state) => ({
          ...styles,
          position: 'relative',
          zIndex: '99999',
          maxHeight: '96px',
          minWidth: '8rem',
          overflow: 'hidden',
          border: '1px solid #yourBorderColor', 
          backgroundColor:'hsl(var(--popover))', 
          color: 'var(--text-popover-foreground)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
          cursor: 'pointer',
          
          ":hover" : {  
            backgroundColor: '#6c6c6c',
          },
        }),
        menu: (styles) => ({
          ...styles,
          width: `${width}`,
          position: 'absolute',
          zIndex: 99999,
          minWidth: '8rem',
          overflow: 'hidden',
          borderRadius: '0.375rem', /* Equivalente a rounded-md */
          border: '1px solid #yourBorderColor', /* Substitua pela cor desejada */
          backgroundColor: "#7474744e",// 'var(--background-color)',
          color: 'var(--text-popover-foreground)', /* Substitua pela cor desejada */
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', /* Equivalente a shadow-md */
        }),
      }}
    />
  );
}

export function SelectItemOtimizadoCustomizado({ options , placeholder , heigth , width , value , onChange  }:SelectItemOtimizadoCustomizadoProps){
  return (
    <Select
      options={options}
      components={{ MenuList: MenuList , IndicatorSeparator: null }}
      placeholder={placeholder}
      value={ options.find((c: any) => c.value === value ) }
      onChange={( optionSelected ) => onChange( optionSelected?.value  )}
      filterOption={createFilter({ ignoreAccents: false })}
      maxMenuHeight={heigth}
      menuPlacement="bottom"
      classNamePrefix="react-select"
      menuShouldScrollIntoView={false}
      

      styles={{
        control: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "2.5rem",
          width: `${width}`,
          borderRadius: "calc(var(--radius) - 2px)",
          borderWidth: "1px",
          backgroundColor: 'hsl(var(--background-color))',
          padding: "0.25rem 0.1rem",
          fontSize: "0.875rem",
        }),

        singleValue: ( value) => ({
          ...value,
          color: 'hsl(var(-muted-foreground))',
        }),
        input: ( value ) => ({
          ...value,
            color: 'var(--color-select)'
        }),
        placeholder: ( styles ) => ({
          ...styles,
          color: 'hsl(var(-muted-foreground)'
        }),      
        option: (styles , state) => ({
          ...styles,
          position: 'relative',
          zIndex: '99999',
          maxHeight: '96px',
          minWidth: '8rem',
          overflow: 'hidden',
          border: '1px solid #yourBorderColor', 
          backgroundColor: 'hsl(var(--popover))', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
          cursor: 'pointer',
          color: 'var(--text-popover-foreground)',

          ":hover" : {  
            backgroundColor: '#6c6c6c',
          }
        }),
        menu: (styles) => ({
          ...styles,
          width: `${width}`,
          position: 'absolute',
          zIndex: 99999,
          minWidth: '8rem',
          overflow: 'hidden',
          borderRadius: '0.375rem', 
          border: '1px solid #yourBorderColor', 
          backgroundColor: "#7474744e",
          color: 'var(--text-popover-foreground)', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
      }}
    />
  );
}

export function SelectItemUpdateOtimizadoCustomizado({ options , placeholder , heigth , width , value , onChange , idItem , inputName }:SelectItemOtimizadoCustomizadoProps){
  return (
    <Select
      options={options}
      components={{ MenuList: MenuList , IndicatorSeparator: null }}
      placeholder={placeholder}
      value={ options.find((c: any) => c.value === value ) }
      onChange={( optionSelected  ) => onChange( optionSelected?.value , idItem , inputName)}
      filterOption={createFilter({ ignoreAccents: false })}
      maxMenuHeight={heigth}
      menuPlacement="bottom"
      classNamePrefix="react-select"
      menuShouldScrollIntoView={false}
      

      styles={{
        control: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "2.5rem",
          width: `${width}`,
          borderRadius: "calc(var(--radius) - 2px)",
          borderWidth: "1px",
          backgroundColor: 'hsl(var(--background-color))',
          padding: "0.25rem 0.1rem",
          fontSize: "0.875rem",
        }),

        singleValue: ( value) => ({
          ...value,
          color: 'hsl(var(-muted-foreground))',
        }),
        input: ( value ) => ({
          ...value,
            color: 'var(--color-select)'
        }),
        placeholder: ( styles ) => ({
          ...styles,
          color: 'hsl(var(-muted-foreground)'
        }),      
        option: (styles , state) => ({
          ...styles,
          position: 'relative',
          zIndex: '99999',
          maxHeight: '96px',
          minWidth: '8rem',
          cursor: 'pointer',
          overflow: 'hidden',
          border: '1px solid #yourBorderColor', 
          backgroundColor: 'hsl(var(--popover))', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
          color: 'var(--text-popover-foreground)',

          ":hover" : {  
            backgroundColor: '#6c6c6c',
          }
        }),
        menu: (styles) => ({
          ...styles,
          width: `${width}`,
          position: 'absolute',
          zIndex: 99999,
          minWidth: '8rem',
          overflow: 'hidden',
          borderRadius: '0.375rem', 
          border: '1px solid #yourBorderColor', 
          backgroundColor: "#7474744e",
          color: 'var(--text-popover-foreground)', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
      }}
    />
  );
}