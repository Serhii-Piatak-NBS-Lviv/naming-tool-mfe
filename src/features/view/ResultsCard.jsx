import React from 'react';
import { Stack, VStack, HStack, StackDivider, Text, Image } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { FaLink, FaTwitter, FaFacebookMessenger } from "react-icons/fa";

import nameSelection from '../../app/apisimul/view/name-selection';
import restAPI from '../../app/apisimul/filter/name-categories';
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';

/**
* @author
* @function 
* FaLink, FaTwitter, FaFacebookMessenger
**/

const ShareBar = () => {

    return (
        <HStack>
            <FaLink />
            <FaTwitter />
            <FaFacebookMessenger />
        </HStack>
    )
}

const NameClassifier = ({ categoryIds, gender }) => {
    const categories = categoryIds.reduce(
        (acc, itm) => {
            restAPI.list.forEach(
                (ctg) => { if (ctg.id === itm) acc.push(ctg.title) }
            );
            return acc;
        }, []
    );

    return (
        <HStack>
            {(gender === "Female" || "Both") ? <BsGenderFemale /> : null}
            {(gender === "Male" || "Both") ? <BsGenderMale /> : null}
            <Text>{categories.join('-')}</Text>
        </HStack>
    )
}

const SelectedName = ({ petName }) => {

    const [cssHeader] = useThemifiedComponent('view-results-header');
    const [cssBody] = useThemifiedComponent('view-results-body');
    const [cssFooter] = useThemifiedComponent('view-results-footer');
    const [cssImage] = useThemifiedComponent('view-results-hero');

    return (
        <Card w='100%'>
            <CardHeader className={cssHeader}>
                <h3>{petName.title}</h3>
            </CardHeader>

            <CardBody className={cssBody} h='100%'>
                <VStack
                    divider={
                        <StackDivider borderColor='red.500' bg='rgb(201,197,185)' h='2px' />
                    } >
                    <NameClassifier
                        categoryIds={petName.categories}
                        gender={petName.gender} />
                    <Text>{petName.description}</Text>
                </VStack>
            </CardBody>

            <CardFooter className={cssFooter} h='100px'>
                <ShareBar />
            </CardFooter>
            <Image
                objectFit='cover'
                src={require('../../app/apisimul/view/hero-puppy.png')}
                alt='Naming Tool Hero Image'
                w='12%'
                className={cssImage}
            />
        </Card>
    )
};


export const ResultsCard = () => {
    return (
        <Stack direction='row'>
            <SelectedName petName={nameSelection} />
        </Stack>
    )
};
