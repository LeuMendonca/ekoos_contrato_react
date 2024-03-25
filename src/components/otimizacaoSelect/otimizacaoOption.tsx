// import { MenuListProps } from "react-select";
// import { components } from 'react-select';
// import PropTypes from "prop-types";

// export const CustomOption = ({ children, ...props }: MenuListProps) => {  
//   const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
//   const newProps = { ...props, innerProps: rest };
//   return (
//     <components.Option {...newProps}>
//       {children}
//     </components.Option>
//   );
// };

// export const CustomOption2 = ({ children, ...props }: MenuListProps) => {  
//   const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
//   const newProps = { ...props, innerProps: rest };
//   return (
//     <components.Option {...newProps}>
//       <p>{newProps.data.label}</p>
//       <p style={{ fontSize: 10 }}>{newProps.data.subLabel}</p>
//     </components.Option>
//   );
// };

// CustomOption.propTypes = {
//   innerProps: PropTypes.object.isRequired,
//   children: PropTypes.node.isRequired
// };

// CustomOption2.propTypes = {
//   innerProps: PropTypes.object.isRequired,
//   children: PropTypes.node.isRequired
// };