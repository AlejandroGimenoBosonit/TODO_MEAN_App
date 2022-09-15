// express
const { request, response } = require('express');
// mongoose Schema
const Card = require('../../models/Card/Card');

const getAllCards = (req=request, res=response) => {};

const getCardById = () => {};

const addCard = async (req=request, res=response) => {
    const { title, subtitle, body } = req. body;

    try {
        // check if there's a card with the same title
        const dbCard = await Card.findOne({title});

        if( dbCard ) {
            return res.status(400).json({
                process_ok: false,
                message: 'This card already exists'
            });
        }

        const payload = new Card({title, subtitle, body});
        
        await payload.save();

        return res.status(200).json({
            process_ok: true,
            message: 'Card added successfully!'
        });

    } catch (error) {
        return res.status(400).json({
            process_ok: false,
            message: "Error with card addition!"
        });
    }

};

const updateCard = async (req=request, res=response) => {
    // extract id from params
    const { id } = req.params;
    // extract new data from body
    const { title, subtitle, body } = req. body;

    try {
        // search into database
        const dbCard = await Card.findById({"_id" : id});

        if( !dbCard ) {
            return res.status(400).json({
                process_ok: false,
                message: 'Card not found in the database'
            });
        }

        // update card
        dbCard.title = title;
        dbCard.subtitle = subtitle;
        dbCard.body = body;
        // TODO: nothing-to-change-response


        // make a new post request
        await dbCard.save();

        // response message
        return res.status(200).json({
            process_ok: true,
            message: "Card updated successfully!"
        });

    } catch (error) {
        return res.status(400).json({
            process_ok: false,
            message: "Error with card modification!"
        });
    }

};

const deleteCard = (req=request, res=response) => {};

module.exports = { getAllCards, getCardById, addCard, updateCard, deleteCard };