DatabaseMVC = window.DatabaseMVC || {};
DatabaseMVC.views = function () {
    var providersData = ["System.Data.SqlClient", "System.Data.MySQL", "System.Data.PostgreSQL"],
        tablesData = ["Table1", "Table2", "Table3", "Table4", "Table5", "Table6", "Table7", "Table8", "Table9", "Table10", "Table11", "Table12"],
        columnsData = ["Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8", "Column9", "Column10", "Column11", "Column12"],
        providers = ko.observableArray([]),
        tables = ko.observableArray([]),
        columns = ko.observableArray([]),
        selectProvider = ko.observable(''),
        selectTable = ko.observable(''),
        connectionString = ko.observable("data source=.\\sqlexpress;initial catalog=Test;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"),
        connection = ko.observable(false),
        jsn = ko.observable(''),
        selectColumns = ko.observableArray([]);
    var selectProv = function (item) {
        selectProvider(item);
        selectTable('');
        selectColumns([]);
        $('#connection').modal('show');
        connection(false);
    },
        selectTab = function (item) {
            selectTable(item);
            selectColumns([]);
            $('#columns').modal('show');
        },
        selectCol = function (item) {
            var result = selectColumns();
            var i = result.indexOf(item);
            if (i > -1) {
                result.splice(i, 1);
            }
            else result.push(item);
            selectColumns(result);
        },
        stylingProv = function (item) {
            if (item == selectProvider()) return "active";
            return "";
        },
        stylingTab = function (item) {
            if (item == selectTable()) return "active";
            return "";
        },
        stylingCol = function (item) {
            var result = selectColumns();
            if (result.indexOf(item) > -1) return "active";
            return "";
        },
        setConnect = function () {
            $('#connection').modal('hide');
            $('#success').modal('show');
            connection(true);
        },
        getJson = function () {
            $('#columns').modal('hide');
            var connections = [],
                queries = [],
                parameters = [];
            connections.push({ providerInvariantName: selectProvider(), connectionString: connectionString() });
            var query = "SELECT ",
                group = " GROUP BY "
            ko.utils.arrayForEach(selectColumns(), function (item) {
                query = query + item + ", ";
                group = group + item + ", ";
            });
            group = group.substring(0, group.length - 2);
            query = query.substring(0, query.length - 2) + ", COUNT(*) FROM " + selectTable() + group + " HAVING COUNT(*) > 1";
            queries.push({ query: query });
            parameters.push({ Name: "UniqueColumnList", Type: "System.String", Value: group.replace(" GROUP BY ", '') });
            parameters.push({ Name: "TargetTable", Type: "System.String", Value: "dbo." + selectTable() });
            jsn(JSON.stringify({
                name: "Uniqueness",
                testFramework: "MSTest",
                connections: connections,
                queries: queries,
                parameters: parameters
            }));
            $('#getJson').modal('show');
        },
        init = function () {
            providers(providersData);
            tables(tablesData);
            columns(columnsData);
        };
    init();
    return {
        providers: providers,
        tables: tables,
        columns: columns,
        selectProv: selectProv,
        selectTab: selectTab,
        selectCol: selectCol,
        stylingProv: stylingProv,
        stylingTab: stylingTab,
        stylingCol: stylingCol,
        connectionString: connectionString,
        connection: connection,
        setConnect: setConnect,
        getJson: getJson,
        jsn:jsn
    };
}
ko.applyBindings(DatabaseMVC.views());