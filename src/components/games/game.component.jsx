import React from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { apiCall } from "../api/api";
import GameCard from "../cards/game-card.component";
import Pagination from "../pagination/pagination.component";

import Utils from "../../utils";

import "./game.styles.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      currentGames: [],
      currentPage: 1,
      searchField: "",
      sortOrder: ""
    };
  }

  componentDidMount() {
    apiCall(
      "https://cors-anywhere.herokuapp.com/" +
        "http://starlord.hackerearth.com/gamesext"
    ).then(records =>
      this.setState({
        games: records,
        currentGames: records.slice(0, 12)
      })
    );
  }

  onPageChanged = data => {
    const { games, searchField } = this.state;
    const filterGames = searchField
      ? games.filter(game => {
          return ("" + game.title)
            .toLowerCase()
            .includes(searchField.toLowerCase());
        })
      : games;
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentGames = filterGames.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentGames });
  };

  handleChange = e => {
    this.setState({ searchField: e.target.value }, () => {
      const { searchField } = this.state;
      const filterGames = searchField
        ? this.state.games.filter(game => {
            return ("" + game.title)
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        : this.state.games;
      this.setState({ currentGames: filterGames.slice(0, 12) });
    });
  };

  handleSelectChange = e => {
    this.setState({ sortOrder: e.target.value }, () => {
      const sortedGames = this.state.games.sort(
        Utils.compareValues("score", this.state.sortOrder.toLowerCase())
      );
      this.setState({
        games: sortedGames,
        currentGames: sortedGames.slice(0, 12)
      });
    });
  };

  render() {
    const domainNames = [
      { label: "--All--", type: "" },
      { label: "Asc", type: "ASC" },
      { label: "Desc", type: "DESC" }
    ];
    const headerClass = [
      "text-dark py-2 pr-2 m-0",
      this.state.currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    const { searchField } = this.state;
    const filterGames = searchField
      ? this.state.games.filter(game => {
          return ("" + game.title)
            .toLowerCase()
            .includes(searchField.toLowerCase());
        })
      : this.state.games;
    return (
      <div>
        {filterGames.length !== 0 ? (
          <div>
            <div className="pagination-main-header">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="search"
                      placeholder="Enter Title"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridOrder">
                    <Form.Label>Sort By Score</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleSelectChange}
                    >
                      {domainNames.map((obj, index) => {
                        return (
                          <option key={index} value={obj.type}>
                            {obj.label}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h6 className={headerClass}>
                <strong className="text-secondary">{filterGames.length}</strong>{" "}
                Transaction
              </h6>
              {this.state.currentPage && (
                <span className="current-page d-inline-block h-100 pl-2 text-secondary">
                  Page{" "}
                  <span className="font-weight-bold">
                    {this.state.currentPage}
                  </span>{" "}
                  /{" "}
                  <span className="font-weight-bold">
                    {Math.ceil(filterGames.length / 12)}
                  </span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center justify-content-center">
              <Pagination
                totalRecords={filterGames.length}
                pageLimit={12}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>
        ) : (
          <div className="d-flex flex-row align-items-center justify-content-center">
            <h2>Loading...</h2>
          </div>
        )}
        <div className="GameCard">
          {this.state.currentGames.map((record, index) => {
            let rec = {
              title: record["title"],
              platform: record["platform"],
              score: record["score"],
              genre: record["genre"],
              editorsChoice: record["editors_choice"],
              releaseYear: record["release_year"]
            };
            return <GameCard key={record["title"] + "" + index} rec={rec} />;
          })}
        </div>
      </div>
    );
  }
}

export default Game;
