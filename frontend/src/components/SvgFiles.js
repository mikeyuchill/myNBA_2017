const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
};

const SvgFiles = importAll(require.context("../images/logo", false, /\.svg$/));

export default SvgFiles;
