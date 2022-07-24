import React from "react";
import "../node_modules/react-simple-tree-menu/dist/main.css";
import TreeMenu, { defaultChildren } from "react-simple-tree-menu";
import { connect } from "react-redux";

const Tree = ({ categories, props }) => {
  let nodes = {};

  for (let index = 0; index < categories.data.length; index++) {
    Object.assign(nodes, {
      [`second-level-${index + 1}`]: {
        ["label"]: categories.data[index].name_en,
        ["index"]: categories.data[index].id,
      },
    });
  }
  const treeDataa = {
    "first-level-node-1": {
      label: "CATEGORIES",
      index: 0,
      nodes,
    },
  };

  return (
    <div className="container-tree">
      <TreeMenu onClickItem={props.onClick} data={treeDataa}>
        {({ items, resetOpenNodes }) => (
          <div className="tree">
            <button onClick={resetOpenNodes} />
            {defaultChildren({ items })}
          </div>
        )}
      </TreeMenu>
    </div>
  );
};
const mapStateToPorps = (state, props) => {
  return {
    categories: state.categories,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToPorps, mapDispatchToProps)(Tree);
