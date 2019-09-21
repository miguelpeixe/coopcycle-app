import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Button, Icon} from 'native-base';
import {withTranslation} from 'react-i18next';
import {popToToHomePage} from '../../redux/App/actions';
import {connect} from 'react-redux';

class ResetPasswordCheckEmail extends Component {
  _onPressClose() {
    this.props.navigation.popToTop();
    this.props.popToToHomePage();
  }

  render() {
    const email = this.props.navigation.getParam('email', '');

    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <Icon type="FontAwesome" name="envelope-o" style={styles.icon} />
          <Text style={{textAlign: 'center'}}>
            {this.props.t('RESET_PASSWORD_CHECK_EMAIL_DISCLAIMER', {email})}
          </Text>
          <Button
            style={{marginTop: 20}}
            block
            transparent
            onPress={() => this._onPressClose()}>
            <Text>{this.props.t('CLOSE')}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 15,
  },
});

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    popToToHomePage: () => dispatch(popToToHomePage()),
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ResetPasswordCheckEmail));
