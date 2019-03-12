import React, { useEffect, useReducer } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro'; // eslint-disable-line no-unused-vars
import { ReleaseSelector } from '../ReleaseSelector';

const buildOnChangeData = newState => {
  return {
    data: newState,
    isValid: function() {
      return newState.releases.length > 0;
    },
    convert: function() {
      return {
        children: R.map(r => ({ releaseId: r.value, phase: 'build' }))(newState.releases),
      };
    },
  };
};
export const BuildPhaseForm = ({ track, onChange }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      let newState = state;
      switch (action.type) {
        case 'setReleases':
          newState = {
            ...state,
            releases: action.payload,
          };
          break;
        default:
          return state;
      }

      onChange(buildOnChangeData(newState));
      return newState;
    },
    {
      releases: [],
    }
  );

  useEffect(() => {
    if (track) {
      onChange(buildOnChangeData(state));
    }
  }, [track]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!track.board) {
    return <div>No board associated with this track.</div>;
  }

  return (
    <ReleaseSelector
      board={track.board}
      onChange={value => {
        dispatch({ type: 'setReleases', payload: value });
      }}
      value={state.releases}
    />
  );
};
BuildPhaseForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  track: PropTypes.shape({
    board: PropTypes.number,
  }).isRequired,
};
