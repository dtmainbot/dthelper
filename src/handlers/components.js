const { readdirSync } = require('fs');
const { log } = require('../functions');
const ExtendedClient = require('../class/ExtendedClient');

/**
 * Load components from a directory and its subdirectories
 * @param {ExtendedClient} client
 * @param {string} type
 * @param {Map} collection
 */
const loadComponents = (client, type, collection) => {
    const folderPath = `./src/components/${type}`;

    // Load components from the main folder
    for (const file of readdirSync(folderPath).filter((f) => f.endsWith('.js'))) {
        const module = require(`../components/${type}/${file}`);

        if (!module) continue;

        if (!module.customId || !module.run) {
            log(`Unable to load the component ${file} due to missing 'structure#customId' or/and 'run' properties.`, 'warn');
            continue;
        }

        collection.set(module.customId, module);
        log(`Loaded new component: ${file}`, 'info');
    }

    // Load components from subfolders
    for (const dir of readdirSync(folderPath, { withFileTypes: true })) {
        if (dir.isDirectory()) {
            for (const file of readdirSync(`${folderPath}/${dir.name}`).filter((f) => f.endsWith('.js'))) {
                const module = require(`../components/${type}/${dir.name}/${file}`);

                if (!module) continue;

                if (!module.customId || !module.run) {
                    log(`Unable to load the component ${file} due to missing 'structure#customId' or/and 'run' properties.`, 'warn');
                    continue;
                }

                collection.set(module.customId, module);
                log(`Loaded new component: ${file}`, 'info');
            }
        }
    }
};

/**
 * @param {ExtendedClient} client
 */
module.exports = (client) => {
    const componentTypes = ['buttons', 'selects', 'modals'];

    for (const type of componentTypes) {
        switch (type) {
            case 'buttons':
                loadComponents(client, type, client.collection.components.buttons);
                break;
            case 'selects':
                loadComponents(client, type, client.collection.components.selects);
                break;
            case 'modals':
                loadComponents(client, type, client.collection.components.modals);
                break;
            default:
                log(`Invalid component type: ${type}`, 'warn');
                break;
        }
    }
};
