/**
 * Created by igor on 11.02.17.
 */

export default function reducer (state = {
    data: {
        APPL: {
            labels: 'APPL',
            values: []
        },
        GOOGL: {
            labels: 'GOOGL',
            values: []
        },
        FB: {
            labels: 'FB',
            values: []
        },
        MSFT: {
            labels: 'MSFT',
            values: []
        }
    },
    yScale: {
        APPL: null,
        GOOGL: null,
        FB: null,
        MSFT: null
    },
    persentType: true
}, action) {
    switch (action.type) {
        case "SET_DATA": {
            const keys = Object.keys(action.data);
            let data = {...state.data};

            keys.forEach((key) => {
                data[key] = {
                    labels: key,
                    values: action.data[key].map((y, x) => {
                        return {x, y, percent: (y / action.data[key][0]) * 100};
                    })
                };

                const yForUpdate = data[key].values.map(d => d[state.persentType ? 'percent' : 'y']);
                const min = Math.round(Math.min(...yForUpdate));
                const max = Math.ceil(Math.max(...yForUpdate));
                state.yScale[key] = d3.scale.linear().domain([max, min]).nice().range([0, 250]);
            });

            state = {...state, ...{data}};

            break;
        }

        case "UPDATE_DATA": {
            let data = {...state.data};
            const keys = Object.keys(data);

            keys.forEach((key) => {
                const values = [...data[key].values];
                const value = values[values.length - 1].y;
                const newValue = value + +(action.data[key] || 0);
                const percent = (newValue / values[0].y) * 100;
                values.push({x: values.length, y: newValue, percent});

                const yForUpdate = values.map(d => d[state.persentType ? 'percent' : 'y']);
                const min = Math.round(Math.min(...yForUpdate));
                const max = Math.ceil(Math.max(...yForUpdate));

                data[key].values = values;
                state.yScale[key] = d3.scale.linear().domain([max, min]).nice().range([0, 250]);
            });

            state = {...state, ...{data}};
            break;
        }

        case "CHANGE_TYPE": {
            state = {...state, ...{persentType: !state.persentType}};
            break;
        }
    }

    return state;
}
