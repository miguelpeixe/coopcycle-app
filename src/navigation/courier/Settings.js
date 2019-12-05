import React from 'react'
import {
  Container, Icon, Left, Right,
  Body, Content, Text,
  List, ListItem, Switch,
} from 'native-base'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  filterTasks,
  clearTasksFilter,
  setKeepAwake,
  selectAreDoneTasksHidden,
  selectAreFailedTasksHidden,
  selectTagNames,
  selectKeepAwake,
} from '../../redux/Courier'
import {doneIconName, failedIconName} from '../task/styles/common'

const Settings = ({
    navigation,
    areDoneTasksHidden,
    areFailedTasksHidden,
    toggleDisplayDone,
    toggleDisplayFailed,
    setKeepAwake,
    tags,
    keepAwake,
    t,
  }) => (
    <Container>
      <Content>
        <List>
          <ListItem itemDivider first>
            <Text>{ t('TASKS_FILTER') }</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon type="FontAwesome" name={doneIconName} />
            </Left>
            <Body>
              <Text>{ t('HIDE_DONE_TASKS') }</Text>
            </Body>
            <Right>
              <Switch
                onValueChange={ () => toggleDisplayDone(areDoneTasksHidden) }
                value={ areDoneTasksHidden } />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon type="FontAwesome" name={failedIconName} />
            </Left>
            <Body>
              <Text>{ t('HIDE_FAILED_TASKS') }</Text>
            </Body>
            <Right>
              <Switch
                onValueChange={ () => toggleDisplayFailed(areFailedTasksHidden) }
                value={ areFailedTasksHidden } />
            </Right>
          </ListItem>
          <ListItem icon onPress={ () => navigation.navigate('CourierSettingsTags') }>
            <Left>
              <Icon active name="pricetag" />
            </Left>
            <Body>
              <Text>{ t('HIDE_TASKS_TAGGED_WITH') }</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>{ t('SETTINGS') }</Text>
          </ListItem>
          <ListItem icon last>
            <Left>
              <Icon active name="power" />
            </Left>
            <Body>
              <Text>{ t('SETTING_KEEP_AWAKE') }</Text>
            </Body>
            <Right>
              <Switch
                onValueChange={ (keepAwake) => setKeepAwake(keepAwake) }
                value={ keepAwake } />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
)

function mapStateToProps(state) {
  return {
    tags: selectTagNames(state),
    areDoneTasksHidden: selectAreDoneTasksHidden(state),
    areFailedTasksHidden: selectAreFailedTasksHidden(state),
    keepAwake: selectKeepAwake(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDisplayDone: (hidden) => dispatch(hidden ? clearTasksFilter({ status: 'DONE' }) : filterTasks({ status: 'DONE' })),
    toggleDisplayFailed: (hidden) => dispatch(hidden ? clearTasksFilter({ status: 'FAILED' }) : filterTasks({ status: 'FAILED' })),
    setKeepAwake: (keepAwake) => dispatch(setKeepAwake(keepAwake)),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
