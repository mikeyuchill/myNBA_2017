import React from 'react';
import { AutoComplete, Input } from 'antd';
import Icon from '@ant-design/icons';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(({ fullName, playerId }) =>
                <Option key={playerId}
                    value={fullName}>
                    <img className="player-option-image"
                        src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`} />
                    <span className="player-option-label">{fullName}</span>
                </Option>
            ),
        });
    }

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName);
        this.props.loadPlayerStats(playerName);
    }

    render() {
        window.nba = nba;
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="col-start-0 col-span-7"
                size="large"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value">
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}
