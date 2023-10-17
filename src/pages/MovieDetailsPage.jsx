import React, { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { getDetailsById } from 'api/getDetailsById';
import SingleMovie from 'components/SingleMovie';
import { Button, Det, LinkWrap } from 'components/Parts.styled';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(location.state);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await getDetailsById(`${movieId}`);
        setMovie(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [movieId]);

  return (
    <Det>
      <Button type="button" onClick={handleBackClick}>
        Go back
      </Button>
      <div>
        {isLoading && 'Loading...'}
        {movie && <SingleMovie data={movie} />}

        <LinkWrap>
          <NavLink
            className="nav-item det-item"
            to="cast"
            state={location.state}
          >
            Cast
          </NavLink>
          <NavLink
            className="nav-item det-item"
            to="reviews"
            state={location.state}
          >
            Reviews
          </NavLink>
        </LinkWrap>
        <Outlet />
      </div>
    </Det>
  );
};

export default MovieDetailsPage;
