import React from "react";
import { useRouter } from "next/router";
import { Layout } from "antd";
import Header from "./../components/Header";
import Footer from "../components/Footer";
import HowWeWork from "../components/How_We_Work";
import { connect } from "react-redux";
import { getProductsApi } from "../state/action/product-actions";
import { getCategoriesApi } from "../state/action/category-actions";
import { FETCH_PRODUCTS_REQUEST } from "../state/type/product-state";
import { FETCH_CATEGORIES_REQUEST } from "../state/type/category-state";
import { getSettingsApi } from "../state/action/settings-actions";
const { Content } = Layout;

const MainLayout = ({
  settingsLenght,
  productsLength,
  productsCurrentState,
  categoriesLength,
  categoriesCurrentState,
  _getProductsApi,
  _getCategoriesApi,
  _getSettingsApi,
  props,
}) => {
  const router = useRouter();
  React.useEffect(() => {
    if (settingsLenght === 0) _getSettingsApi();
  }, [_getSettingsApi, settingsLenght]);

  React.useEffect(() => {
    if (productsLength === 0 && productsCurrentState !== FETCH_PRODUCTS_REQUEST)
      _getProductsApi();
  }, [_getProductsApi, productsLength, productsCurrentState]);

  React.useEffect(() => {
    if (
      categoriesLength === 0 &&
      categoriesCurrentState !== FETCH_CATEGORIES_REQUEST
    )
      _getCategoriesApi();
  }, [_getCategoriesApi, categoriesLength, categoriesCurrentState]);

  return (
    <Layout>
      {router.asPath === "/login" ||
      router.asPath === "/register" ||
      router.asPath === "/profile" ? (
        <Content>{props.children}</Content>
      ) : (
        <Layout>
          <Header
            images={
              router.asPath === "/" || router.asPath === "/product"
                ? true
                : false
            }
          />
          <Content>{props.children}</Content>
          {router.asPath !== "/" ? <HowWeWork /> : null}
          <Footer />
        </Layout>
      )}
    </Layout>
  );
};

const mapStateToPorps = (state, props) => {
  return {
    settingsLenght: state.settings.data.length,
    productsLength: state.products.data.length,
    productsCurrentState: state.products.currentState,
    categoriesLength: state.categories.data.length,
    categoriesCurrentState: state.categories.currentState,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getProductsApi: () => dispatch(getProductsApi()),
    _getCategoriesApi: () => dispatch(getCategoriesApi()),
    _getSettingsApi: () => dispatch(getSettingsApi()),
  };
};

export default connect(mapStateToPorps, mapDispatchToProps)(MainLayout);
